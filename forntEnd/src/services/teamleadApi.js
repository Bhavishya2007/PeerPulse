import api from "./api";


export async function getTeamLeadDashboard() {

  const response = await api.get(
    "/teamlead/dashboard"
  );

  return response.data;

}


export async function getWeeklyReports() {

  const response = await api.get(
    "/teamlead/reports"
  );

  return response.data;

}


export async function createWeeklyReport(
  data
) {

  const response = await api.post(
    "/teamlead/reports",
    data
  );

  return response.data;

}


export async function approveWeeklyReport(
  reportId,
  data
) {

  const response = await api.post(
    `/teamlead/reports/${reportId}/approve`,
    data
  );

  return response.data;

}