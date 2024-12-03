import dashboardModel from "../models/dashboardModel.js";

const showDashboard = async (req, res) => {
    try {
        const dashboardData = await dashboardModel.getDashboardData();

        // Agrupar los datos por película para organizar mejor en la vista
        const groupedData = dashboardData.reduce((acc, curr) => {
            if (!acc[curr.movie_title]) {
                acc[curr.movie_title] = [];
            }
            acc[curr.movie_title].push({
                room_name: curr.room_name,
                schedule_time: curr.schedule_time,
                customer_name: curr.customer_name,
            });
            return acc;
        }, {});

        console.log(JSON.stringify(groupedData))

        res.render("dashboard/index", { groupedData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar la información del dashboard");
    }
};

export default { showDashboard };
