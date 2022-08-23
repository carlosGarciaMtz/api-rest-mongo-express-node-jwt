import { nanoid } from "nanoid"
import { Link } from "../models/Links.js"

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid:req.uid })

    res.status(201).json({
      status: "success",
      msg: {
        links
      },
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: "Error del servidor: " + error,
    })
  }
}

export const createLink = async (req, res) => {
  try {
    const { url } = req.body;
    
    const link = new Link({
      longLink: url,
      uid: req.uid,
      nanoLink: nanoid(6),
    });
    
    await link.save();
    
    return res.status(201).json({
      status: "success",
      msg: {
        link
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: "Error del servidor: " + error.message
    })
  }
}

export const getOneLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    const link = await Link.findOne({nanoLink});
    
    if (!link) throw {code: 404}

    return res.status(200).json({
      status: "success",
      msg: {
        longLink: link.longLink 
      },
    });
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

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;

    const link = await Link.findById(id);

    if (!link) throw {code: 404}

    if (!link.uid.equals(req.uid)) throw {code:401}

    link.longLink = url

    await link.save();

    return res.status(200).json({
      status: "success",
      msg: {
        link
      },
    });
  } catch (error) {
    if (error.code === 404) return res.status(404).json({
      status: "error",
      msg: "No existe el link",
    });

    if (error.code === 401) return res.status(401).json({
      status: "error",
      msg: "No tienes acceso a este link",
    });

    return res.status(500).json({
      status: "error",
      msg: "Error del servidor - link: " + error.message
    })
  }
}

export const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);

    if (!link) throw {code: 404}

    console.log(link.uid, req.uid)

    if (!link.uid.equals(req.uid)) throw {code:401}

    await link.remove();

    return res.status(200).json({
      status: "success",
      msg: {
        link
      },
    });
  } catch (error) {
    if (error.code === 404) return res.status(404).json({
      status: "error",
      msg: "No existe el link",
    });

    if (error.code === 401) return res.status(401).json({
      status: "error",
      msg: "No tienes acceso a este link",
    });

    return res.status(500).json({
      status: "error",
      msg: "Error del servidor - link: " + error.message
    })
  }
}