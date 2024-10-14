







const KeyBindingsModal = () => (
      <div className="game-config-popup-container" id="game-config-popup">
        <div className="game-config-popup">
          <p className="game-config-popup__title">Change Keybindings</p>
          <div className="game-config-popup__key-bindings">
            <div className="key-bind-container key-bind-container--up">
              <p>
                <img
                  className="arrow-image"
                  src="data/Images/Arrows/U - Copy.png"
                />
              </p>
              <input name="up" type="text" />
            </div>
            <div className="key-bind-container key-bind-container--left">
              <p>
                <img
                  className="arrow-image"
                  src="data/Images/Arrows/L - Copy.png"
                />
              </p>
              <input name="left" type="text" />
            </div>
            <div className="key-bind-container key-bind-container--down">
              <p>
                <img
                  className="arrow-image"
                  src="data/Images/Arrows/D - Copy.png"
                />
              </p>
              <input name="down" type="text" />
            </div>
            <div className="key-bind-container key-bind-container--right">
              <p>
                <img
                  className="arrow-image"
                  src="data/Images/Arrows/R - Copy.png"
                />
              </p>
              <input name="right" type="text" />
            </div>
          </div>
          <div className="game-config-popup__action-buttons">
            <button
              role="button"
              data-action-type="game-config--save"
              className="button save-button"
            >
              save
            </button>
            <button
              role="button"
              onClick={toggleConfigPopup} 
              className="button close-button"
            >
              close
            </button>
          </div>
        </div>
      </div>
  );
