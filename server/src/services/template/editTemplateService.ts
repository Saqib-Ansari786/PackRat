
import { prisma } from "../../prisma/index";

/**
 * Edits a template.
 * @param {string} templateId - The ID of the template to edit.
 * @param {string} type - The new type of the template (optional).
 * @param {boolean} isGlobalTemplate - The new value for isGlobalTemplate (optional).
 */
export const editTemplateService = async (
  templateId: string,
  type: string,
  isGlobalTemplate: boolean,
) => {
  try {
    const template = await prisma.template.findUnique({
      where: {
        id: templateId,
      },
    });
    
    if (!template) {
      throw new Error('Template not found');
    }
    
  
   
    const updatedTemplate = await prisma.template.update({
      where: {
        id: templateId,
      },
      data: {
        type: type || template.type,
        isGlobalTemplate:
          isGlobalTemplate !== undefined ? isGlobalTemplate : template.isGlobalTemplate,
      },
    });
    
    return updatedTemplate;
  } catch (error) {
    throw new Error(error.toString());
  }
};