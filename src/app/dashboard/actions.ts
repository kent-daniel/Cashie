"use server";

import { createProject } from "@/data-access/projects";
import { revalidatePath } from "next/cache";

const createNewProject = async (data: any) => {
  try {
    const response = await createProject(data);
    if (response.success) {
      revalidatePath("/");
    }
    return response;
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      message: "Failed to create project. Please try again.",
    };
  }
};

export default createNewProject;
