import api from "./api";


export async function createDailyUpdate(
  data
) {

  const response = await api.post(
    "/employee/updates",
    data
  );

  return response.data;

}


export async function getMyUpdates() {

  const response = await api.get(
    "/employee/updates"
  );

  return response.data;

}


export async function getEmployees() {

  const response = await api.get(
    "/employee/employees"
  );

  return response.data;

}


export async function createShoutout(
  data
) {

  const response = await api.post(
    "/employee/shoutouts",
    data
  );

  return response.data;

}


export async function getReceivedShoutouts() {

  const response = await api.get(
    "/employee/shoutouts/received"
  );

  return response.data;

}


export async function getShoutoutQuota() {

  const response = await api.get(
    "/employee/shoutouts/quota"
  );

  return response.data;

}