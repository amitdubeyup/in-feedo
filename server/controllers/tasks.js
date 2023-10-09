const TasksModal = require('../modals/tasks');
const ObjectId = require('mongoose').Types.ObjectId;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const createTask = async (req, res) => {
    try {
        const data = {
            open_tasks: req.body?.open_tasks ?? 0,
            inprogress_tasks: req.body?.inprogress_tasks ?? 0,
            completed_tasks: req.body?.completed_tasks ?? 0
        };
        const result = await new TasksModal(data).save();
        return res.send({
            success: true,
            message: `Task created successfully.`,
            data: result
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error?.message ?? `Unable to create task.`
        });
    }
}

const updateTask = async (req, res) => {
    try {
        if (!req.body?.task_id) throw new Error('Task id is required.');
        const data = JSON.parse(JSON.stringify({
            open_tasks: req.body?.open_tasks ?? undefined,
            inprogress_tasks: req.body?.inprogress_tasks ?? undefined,
            completed_tasks: req.body?.completed_tasks ?? undefined
        }));
        const result = await TasksModal.findByIdAndUpdate({ _id: new ObjectId(req.body?.task_id) }, { $set: data }, { new: true });
        if (!result) throw new Error('Task details not found, please enter valid task id.');
        return res.send({
            success: true,
            message: 'Task updated successfully.',
            data: result
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error?.message ?? 'Unable to update task.'
        });
    }
}

const fetchTask = async (req, res) => {
    try {
        let sort_by = { created_at: -1 };
        if (req.query?.created_at) sort_by = { created_at: parseInt(req.query?.created_at) };
        if (req.query?.open_tasks) sort_by = { open_tasks: parseInt(req.query?.open_tasks) };
        if (req.query?.inprogress_tasks) sort_by = { inprogress_tasks: parseInt(req.query?.inprogress_tasks) };
        if (req.query?.completed_tasks) sort_by = { completed_tasks: parseInt(req.query?.completed_tasks) };
        const limit = req.query?.limit ? parseInt(req.query?.limit) : 10;
        const skip = req.query?.skip ? parseInt(req.query?.skip) : 0;
        const query = {};
        if (req.query?.task_id) query['_id'] = new ObjectId(req.query?.task_id);
        const result = await TasksModal.find(query).select(['open_tasks', 'inprogress_tasks', 'completed_tasks', 'created_at', 'updated_at']).sort(sort_by).limit(limit + 1).skip(skip * limit);
        const have_prev = skip > 0 ? true : false;
        const have_next = result.length > limit ? true : false;
        if (result.length > limit) result.pop();
        return res.send({
            success: true,
            message: 'Task fetched successfully.',
            have_prev: have_prev,
            have_next: have_next,
            data: result
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error?.message ?? 'Unable to fetch task.'
        });
    }
}

const metricTask = async (req, res) => {
    try {
        const result = await TasksModal.find({});
        const final = new Array(12).fill(null);
        result.forEach((el, i) => {
            const date = new Date(el.created_at);
            const month = date.getMonth();
            const index = final.findIndex((el) => el?.date == `${months[month]} 2023`);
            if (index > -1) {
                final[index] = {
                    date: final[index].date,
                    metrics: {
                        open_tasks: Number(final[index].metrics.open_tasks) + Number(el?.open_tasks),
                        inprogress_tasks: Number(final[index].metrics.inprogress_tasks) + Number(el?.inprogress_tasks),
                        completed_tasks: Number(final[index].metrics.completed_tasks) + Number(el?.completed_tasks),
                    }
                };
            } else {
                final[month] = {
                    date: `${months[month]} 2023`,
                    metrics: {
                        open_tasks: el?.open_tasks,
                        inprogress_tasks: el?.inprogress_tasks,
                        completed_tasks: el?.completed_tasks,
                    }
                };
            }
        });
        return res.send({
            success: true,
            message: 'Task metric fetched successfully.',
            data: final.filter((el) => el)
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error?.message ?? 'Unable to fetch task metric.'
        });
    }
}


module.exports = {
    createTask: createTask,
    updateTask: updateTask,
    fetchTask: fetchTask,
    metricTask: metricTask
};
