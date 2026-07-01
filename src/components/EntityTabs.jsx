import { entities } from "../data/entities.jsx";

export function EntityTabs({ active, setActive }) {
  return (
    <div className="tabs">
      {Object.entries(entities).map(([key, entity]) => {
        const Icon = entity.icon;
        return (
          <button key={key} className={active === key ? "tab active" : "tab"} onClick={() => setActive(key)} type="button">
            <Icon size={17} /> {entity.label}
          </button>
        );
      })}
    </div>
  );
}

