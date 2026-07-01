import { entities } from "../data/entities.jsx";

export function emptyForm(key) {
  return Object.fromEntries(entities[key].fields.map((field) => [field.name, ""]));
}

export function validateForm(key, values) {
  const errors = {};

  entities[key].fields.forEach((field) => {
    const value = values[field.name];
    if (field.required && (value === "" || value === null || value === undefined)) {
      errors[field.name] = `${field.label} is required`;
    }
    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field.name] = "Enter a valid email address";
    }
    if (field.type === "number" && value !== "" && Number(value) < (field.min ?? 0)) {
      errors[field.name] = `${field.label} must be at least ${field.min ?? 0}`;
    }
  });

  return errors;
}

export function normalizePayload(key, values, idValue) {
  const payload = { ...values };

  entities[key].fields.forEach((field) => {
    if (field.type === "number") {
      payload[field.name] = Number(payload[field.name]);
    }
  });

  if (idValue) {
    payload[entities[key].id] = Number(idValue);
  }

  return payload;
}

