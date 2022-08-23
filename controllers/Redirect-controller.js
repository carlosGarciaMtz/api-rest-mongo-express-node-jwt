import { Link } from "../models/Links.js";

 
export const redirectLink = async (req, res, next) =>{
  try {
    const { nanoLink } = req.params;
    const link = await Link.findOne({nanoLink});
    
    if (!link) throw {code: 404}

    return res.redirect(link.longLink);
  } catch (error) {
    if (error.code === 404) return res.status(404).json({
      status: "error",
      msg: "No existe el link",
    });

    return res.status(500).json({
      status: "error",
      msg: "Error del servidor - link: " + error.message
    })
  }
}