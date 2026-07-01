import { Trash2 } from "lucide-react";
import { entities } from "../data/entities.jsx";
import { formatCell, labelize } from "../utils/format.js";

export function DataTable({ entityKey, items, onDelete }) {
  const entity = entities[entityKey];
  const fields = [entity.id, ...entity.fields.map((field) => field.name)];

  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            {fields.map((field) => <th key={field}>{labelize(field)}</th>)}
            {onDelete && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr><td colSpan={fields.length + (onDelete ? 1 : 0)} className="empty">No records found</td></tr>
          ) : (
            items.map((item) => (
              <tr key={item[entity.id]}>
                {fields.map((field) => <td key={field}>{formatCell(item[field])}</td>)}
                {onDelete && (
                  <td>
                    <button className="iconButton danger" onClick={() => onDelete(item)} title="Delete record">
                      <Trash2 size={17} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

