import axios from "axios";

const URL = "https://api.blocksrvt.com/v1";

const api = axios.create({
	baseURL: URL,
});

export default api;
