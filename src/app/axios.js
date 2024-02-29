import axios from "axios";

const instance = axios.create({
	baseURL: "https://ff-writer-chowswebsite.koyeb.app/",
});

export default instance;
