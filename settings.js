

const SettingsButtons = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState({
    myName: localStorage.getItem("myName") || "",
    unwantedStratagems:
      JSON.parse(localStorage.getItem("unwantedStratagems")) || [],
  });

  const handleSettingsOpen = () => setIsOpen(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "unwantedStratagems") {
      setSettings((prev) => ({
        ...prev,
        [name]: value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }));
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    localStorage.setItem("myName", settings.myName);
    localStorage.setItem(
      "unwantedStratagems",
      JSON.stringify(settings.unwantedStratagems)
    );
    setIsOpen(false);
    // You might want to trigger a refresh of the main game component here
  };

  return (
    <div>
      <KeyBindingsModal />
      <SettingsModal />
      <div className="info__config-actions-container">
        <button onClick={toggleConfigPopup} className="settings-button button">
          Bindings
        </button>
        <button onClick={toggleSettingsPopup} className="settings-button button">
          Settings
        </button>
      </div>

      {isOpen && (
        <div className="settings-modal">
          <div className="settings-content">
            <h2>Game Settings</h2>
            <div className="setting-item">
              <label htmlFor="myName">My Name:</label>
              <input
                type="text"
                id="myName"
                name="myName"
                value={settings.myName}
                onChange={handleChange}
              />
            </div>
            <div className="setting-item">
              <label htmlFor="unwantedStratagems">Unwanted Stratagems:</label>
              <input
                type="text"
                id="unwantedStratagems"
                name="unwantedStratagems"
                value={settings.unwantedStratagems.join(", ")}
                onChange={handleChange}
                placeholder="Enter stratagem names, separated by commas"
              />
            </div>
            <div className="settings-actions">
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button onClick={handleClose} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<SettingsButtons />, document.getElementById("react-settings"));
console.log("SettingsModal rendered");

KEYBINDINGS_MODALE = document.getElementById("game-config-popup");
SETTINGS_MODALE = document.getElementById("game-settings-popup");
