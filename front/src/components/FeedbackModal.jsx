import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FeedbackModal = ({ open, handleClose, feedbackData }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Your Feedbacks
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {feedbackData.length > 0 ? (
            <div>
              <p>Feedback Data:</p>
              {feedbackData.map((feedback, index) => (
                <div key={index}>
                  <p>countSmiley: {feedback.countSmiley}</p>
                  <p>countFrowny: {feedback.countFrowny}</p>
                  <p>countConfused: {feedback.countConfused}</p>
                  <p>countSurprised: {feedback.countSurprised}</p>
                  <p>createdAt: {feedback.createdAt}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No feedback available for this activity.</p>
          )}
        </Typography>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;
