const ArrowIcons = ({ arrowList }) => {
  return (
    <table className="arrows-table">
      <tbody>
        <tr>
          {arrowList.split("").map((arrow, index) => (
            <td key={Math.random()}>
              <img
                className="arrow-incomplete-filter "
                src={`data/Images/Arrows/${arrow.toUpperCase()} - Copy.png`}
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

const StratagemToggle = ({ name, sequence, image, on, toggleStratagem }) => {
  //const [selected, setSelected] = React.useState(on);

  return (
    <div
      className={"stratagem-toggle" + (on ? " selected" : "")}
      onClick={() => {
        //setSelected(!selected);
        toggleStratagem(name);
      }}
    >
      <img
        src={`data/Images/Stratagem Icons/hd2/${image}`}
        alt={name}
        className="stratagem-icon"
        draggable="false"
      />
      <div className="settings-stratagem-name">{name}</div>
      {false && (
        <div className="stratagem-sequence">
          <ArrowIcons arrowList={sequence} />
        </div>
      )}
    </div>
  );
};

const SettingsModal = () => {
  const [loadout, setLoadout] = usePersistantState("stratagemsLoadout", []);
  const [timescale, setTimescale] = usePersistantState("timescale", 1);
  let groupedStrat = groupBy(stratagems, "type");

  React.useEffect(() => {
    let newSpeed = timescale;
    if (timescale <= 0) {
      newSpeed = 1;
      setTimescale(newSpeed);
    }
    playingSpeed = newSpeed;
  }, [timescale]);

  React.useEffect(() => {
    console.log(loadout);
    if (loadout.length <= 0) playingStratagems = stratagems;
    else playingStratagems = loadout;

    currentStratagemsList = [];
    // Load first stratagems
    for (let i = 0; i < CURRENT_STRATAGEM_LIST_LENGTH; i++) {
      currentStratagemsList.push(pickRandomStratagem());
    }
  }, [loadout]);

  const onSave = () => {
    toggleSettingsPopup();
  };

  const toggleStratagem = (stratagemName) => {
    let strat = stratagems.find((strat) => strat.name == stratagemName);
    if (loadout.some((strat) => strat.name == stratagemName)) {
      console.log("removing:", stratagemName);
      setLoadout(loadout.filter((strat) => strat.name != stratagemName));
    } else {
      console.log("adding:", stratagemName);
      setLoadout([...loadout, strat]);
    }
  };

  const setSpeed = (speed) => {
    if (!isNaN(speed) && speed > 0) {
      setTimescale(speed);
    }
  };

  return (
    <div className="game-config-popup-container" id="game-settings-popup">
      <div className="game-config-popup">
        <h2 className="game-config-popup__title">Settings</h2>
        <div className="stratagem-selection">
          <button onClick={() => setLoadout([])}>Clear All</button>
          {Object.keys(groupedStrat).map((type) => (
            <div key={type}>
              <h3 className="stratagem-group__title">{type}</h3>
              <div key={type} className="stratagem-group">
                {groupedStrat[type].map((stratagem) => (
                  <StratagemToggle
                    key={stratagem.name}
                    {...stratagem}
                    on={loadout.some((strat) => strat.name == stratagem.name)}
                    toggleStratagem={toggleStratagem}
                  />
                ))}
              </div>
            </div>
          ))}
          {false &&
            stratagems.map((stratagem) => (
              <StratagemToggle
                key={stratagem.name}
                {...stratagem}
                on={loadout.some((strat) => strat.name == stratagem.name)}
                toggleStratagem={toggleStratagem}
              />
            ))}
        </div>

        <div className="game-config-popup__timescale">
          Speed :{" "}
          <input
            type="text"
            value={timescale}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div className="game-config-popup__action-buttons">
          <button role="button" onClick={toggleSettingsPopup} className="button close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

function toggleSettingsPopup() {
  let popupCurrentState = SETTINGS_MODALE.classList.contains("active");

  if (popupCurrentState == true) {
    SETTINGS_MODALE.classList.remove("active");
    addMainGameListener();
    removeConfigPopupListener();
  } else {
    SETTINGS_MODALE.classList.add("active");
    initaliseConfigPopupInputs();
    removeMainGameListener();
    addConfigPopupListener();
    TEMPARROWKEYS = Object.assign({}, CONFIG.arrowKeys);
  }
}

function usePersistantState(key, initialValue) {
  const [state, setInternalState] = React.useState(initialValue);

  React.useEffect(() => {
    const value = localStorage.getItem(key);

    if (!value) return;

    setInternalState(JSON.parse(value));
  }, [key]);

  const setState = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setInternalState(value);
  };

  return [state, setState];
}
