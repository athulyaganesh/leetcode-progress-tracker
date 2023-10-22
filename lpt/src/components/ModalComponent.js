import React from 'react';
import Stopwatch from './Stopwatch';

const ModalComponent = ({ showModal, modalUrl, title, onClose }) => {
  if (!showModal) {
    return null;
  }

  const handleClose = (e) => {
    onClose && onClose(e);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">{title}</div>
        <div className="question-button">
          <button className="fancy-button">
            <a href={modalUrl} target="_blank" rel="noopener noreferrer">
              Question
            </a>
          </button>
        </div>
        <div className="scrollable-content">
          <div className="stopwatch-container">
            <Stopwatch />
          </div>

          <div className="form-container">
            <h2>Feedback Form</h2>
            <form>
              <div className="form-group">
                <label htmlFor="help">Did you need help? If so, how much?</label>
                <select id="help" name="help">
                  <option value="not-at-all">Not at all</option>
                  <option value="a-little-bit">A little bit</option>
                  <option value="quite-a-bit">Quite a bit</option>
                  <option value="a-lot">A lot</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="backlog">Backlog:</label>
                <input type="text" id="backlog" name="backlog" placeholder="Describe your backlog here..." />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes for next time:</label>
                <textarea id="notes" name="notes" placeholder="Write your notes here..."></textarea>
              </div>

              <input type="submit" value="Submit" className="submit-button" />
            </form>
          </div>
        </div>

        <div className="modal-actions">
          <button className="fancy-button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
