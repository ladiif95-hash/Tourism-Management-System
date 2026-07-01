import { useState } from "react";
import { Edit3, PlusCircle } from "lucide-react";
import { entities } from "../data/entities.jsx";
import { apiJson } from "../services/api.js";
import { emptyForm, normalizePayload, validateForm } from "../utils/form.js";
import { useApiData } from "../hooks/useApiData.js";

export function CrudForm({ entityKey, mode, initialValues, recordId }) {
  const entity = entities[entityKey];
  const { data } = useApiData();
  const [values, setValues] = useState(initialValues ?? emptyForm(entityKey));
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  async function submit(event) {
    event.preventDefault();
    const nextErrors = validateForm(entityKey, values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setMessage({ type: "error", text: "Please fix the validation errors before saving." });
      return;
    }

    try {
      const payload = normalizePayload(entityKey, values, recordId);
      if (mode === "add") {
        await apiJson(entity.endpoint, { method: "POST", body: JSON.stringify(payload) });
        setValues(emptyForm(entityKey));
        setMessage({ type: "success", text: `${entity.label} record added successfully.` });
      } else {
        await apiJson(`${entity.endpoint}/${recordId}`, { method: "PUT", body: JSON.stringify(payload) });
        setMessage({ type: "success", text: `${entity.label} record updated successfully.` });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Save failed. Check the API, SQL Server, and required IDs." });
    }
  }

  return (
    <form className="panel formGrid" onSubmit={submit}>
      {entity.fields.map((field) => (
        <label key={field.name}>
          {field.label}
          {field.optionsFrom ? (
            <select
              value={values[field.name] ?? ""}
              onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}
            >
              <option value="">Select {field.label}</option>
              {(data[field.optionsFrom] || []).map((item) => {
                const optionEntity = entities[field.optionsFrom];
                return (
                  <option key={item[optionEntity.id]} value={item[optionEntity.id]}>
                    {item[optionEntity.title]} #{item[optionEntity.id]}
                  </option>
                );
              })}
            </select>
          ) : (
            <input
              type={field.type ?? "text"}
              min={field.min}
              value={values[field.name] ?? ""}
              onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}
            />
          )}
          {errors[field.name] && <span className="errorText">{errors[field.name]}</span>}
        </label>
      ))}
      <button className="button primary" type="submit">
        {mode === "add" ? <PlusCircle size={18} /> : <Edit3 size={18} />}
        {mode === "add" ? "Save Record" : "Update Record"}
      </button>
      {message.text && <p className={`feedback ${message.type}`}>{message.text}</p>}
    </form>
  );
}
