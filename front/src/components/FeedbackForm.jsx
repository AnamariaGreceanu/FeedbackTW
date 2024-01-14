import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { postFeedback } from '../api/api';

import { BiConfused } from 'react-icons/bi';
import { FaRegSurprise } from 'react-icons/fa';
import { HiOutlineFaceFrown } from 'react-icons/hi2';
import { FaRegSmileBeam } from 'react-icons/fa';

function FeedbackForm({ activityId }) {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [count, setCount] = useState({
    confused: 0,
    surprised: 0,
    frowny: 0,
    smiley: 0,
  });

  const handleClick = (emojiId) => {
    setSelectedEmoji(emojiId);
    setCount((prevCount) => ({ ...prevCount, [emojiId]: prevCount[emojiId] + 1 }));
  };

  const isButtonDisabled = !selectedEmoji;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      countConfused: count.confused,
      countSurprised: count.surprised,
      countFrowny: count.frowny,
      countSmiley: count.smiley,
    };

    try {
      const response = await postFeedback(feedbackData, activityId);

      if (response.status === 201 && response.data) {
        alert("feddback registered")
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Form Title
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="bigContainer">
            <h2>Select the reactions</h2>
            <div className="emoji-group">
                <span className={`emoji ${selectedEmoji === 'confused' && 'selected'}`} onClick={() => handleClick('confused')}>
                  <BiConfused />
                  {count.confused}
                </span>
                <span className={`emoji ${selectedEmoji === 'surprised' && 'selected'}`} onClick={() => handleClick('surprised')}>
                  <FaRegSurprise />
                  {count.surprised}
                </span>
                <span className={`emoji ${selectedEmoji === 'frowny' && 'selected'}`} onClick={() => handleClick('frowny')}>
                  <HiOutlineFaceFrown />
                  {count.frowny}
                </span>
                <span className={`emoji ${selectedEmoji === 'smiley' && 'selected'}`} onClick={() => handleClick('smiley')}>
                  <FaRegSmileBeam />
                  {count.smiley}
                </span>
            </div>
          </div>
          <Button type="submit" disabled={isButtonDisabled}>
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FeedbackForm;
