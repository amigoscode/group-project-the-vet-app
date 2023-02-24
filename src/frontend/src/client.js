import fetch from "unfetch";

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  console.log("la respuesta es")
  console.log(response);
  const error = new Error(response.statusText);
  error.response = response;
  console.log(error);
  return Promise.reject(error);
};

export const getAllRows = (prop) => fetch(`api/v1/${prop}`).then(checkStatus);

export const addNewEntry = (type, info) =>
  fetch(`api/v1/${type}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(info),
  }).then(checkStatus);

  export const addNewPet = (ownerId,doctorId, info) =>
  fetch(`api/v1/pets/owner/${ownerId}/doctor/${doctorId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(info),
  }).then(checkStatus);

  export const addNewVisit = (petId, info) =>
  fetch(`api/v1/visit/pet/${petId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(info),
  }).then(checkStatus);

  export const addNewVaccineToVisit = (petId,vaccineId, visitId) =>
  fetch(`api/v1/vaccines/${petId}/${vaccineId}/visit/${visitId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  }).then(checkStatus);

export const deleteEntry = (entry, entryId) =>
  fetch(`api/v1/${entry}/${entryId}`, {
    method: "DELETE",
  }).then(checkStatus)

  export const getEntry = (entry, entryId) =>
  fetch(`/api/v1/${entry}/${entryId}`).then(checkStatus);

  export const getDogCount = () =>
  fetch(`api/v1/dashboard`).then(checkStatus);

  export const getOwnersIdAndName = () =>
  fetch(`api/v1/owners/ownersDropdown`).then(checkStatus);

  export const getOwnerByEmail = (email) =>
  fetch(`api/v1/owners/ownerView/${email}`).then(checkStatus);

  export const getOwnerPetList = (id) =>
  fetch(`api/v1/pets/allPetsOfOwner/${id}`).then(checkStatus);

  export const getVaccines = () =>
  fetch(`/api/v1/vaccines`).then(checkStatus);

  export const getDocLinks = (id, key) =>
  fetch(`api/v1/documents/pet/${id}/download/${key}`).then(checkStatus);

  export const getDocLinkFromVisit = (id, key) =>
  fetch(`api/v1/documents/visit/${id}/download/${key}`).then(checkStatus);
