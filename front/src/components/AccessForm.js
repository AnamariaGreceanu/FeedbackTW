import React from "react";
const AccesForm = ({ onSubmit,onCodeChange }) => {
  const handleCodeChange = (e) => {
    onCodeChange(e.target.value);
  };
    return (
        <form>
        <h1>enter the access code</h1>
        <div className="flex flex-col space-y-2">
          <input
            id="aceesCode"
            className="p-2 h-24 w-64 border border-gray-400 rounded-md"
            type="text"
            onChange={handleCodeChange}
          ></input>
          <button
            className="p-2 ml-auto rounded-lg bg-blue-700 hover:bg-blue-600 shadow-md hover:shadow-lg text-white"
            type="submit"
            onClick={onSubmit}
          >
            Try code
          </button>
        </div>
      </form>
    )
}

export default FeedbackForm;