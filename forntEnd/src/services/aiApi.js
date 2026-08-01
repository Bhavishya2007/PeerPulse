import api from "./api";


export async function generateAppraisal(
  employeeId,
  month,
  includeTraining = true
) {

  const response = await api.post(
    "/ai/analyze",
    {
      employee_id: Number(employeeId),

      month,

      include_training:
        includeTraining
    }
  );


  return response.data;

}


export async function getAppraisals() {

  const response = await api.get(
    "/hr/appraisals"
  );

  return response.data;

}


export async function getTrainingRecommendations() {

  const response = await api.get(
    "/hr/trainings"
  );

  return response.data;

}


export async function getHRDashboard() {

  const response = await api.get(
    "/hr/dashboard"
  );

  return response.data;

}