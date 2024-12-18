import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid2,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import useStore, { ITask } from "../store/useStore";
import moment from "moment";

export default function TaskList() {
  const { tasks, getTaskList, deleteTask, updateTask, createTask } = useStore();
  const [taskList, setTaskList] = useState<ITask[]>(tasks);
  useEffect(() => {
    getTaskList();
  }, []);

  useEffect(() => {
    setTaskList(tasks);
  }, [JSON.stringify(tasks)]);

  const onEditOrSave = (taskId: number, isToggleEdit: boolean) => {
    const newTasks = [...taskList];
    const taskIndex = newTasks.findIndex((item) => item.id === taskId);
    if (taskIndex > -1) {
      if (isToggleEdit) {
        newTasks[taskIndex].isEdit = true;
        setTaskList(newTasks);
      } else {
        if (newTasks[taskIndex].task && newTasks[taskIndex].tempStatus) {
          if (newTasks[taskIndex].id !== -1) {
            newTasks[taskIndex].status = newTasks[taskIndex].tempStatus;
            updateTask(newTasks[taskIndex]);
          } else {
            let maxId = newTasks.reduce(
              (max, item) => (item.id > max ? item.id : max),
              0
            );
            maxId = maxId + 1;
            newTasks[taskIndex].id = maxId;
            newTasks[taskIndex].status = newTasks[taskIndex].tempStatus;
            createTask(newTasks[taskIndex]);
          }
        }
      }
    }
  };

  const handleChangeTask = (
    taskId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTasks = [...taskList];
    const taskIndex = newTasks.findIndex((item) => item.id === taskId);
    if (taskIndex > -1) {
      newTasks[taskIndex].task = event.target.value;
    }
    setTaskList(newTasks);
  };

  const handleChangeTaskStatus = (taskId: number, event: SelectChangeEvent) => {
    const newTasks = [...taskList];
    const taskIndex = newTasks.findIndex((item) => item.id === taskId);
    if (taskIndex > -1) {
      newTasks[taskIndex].tempStatus = event.target.value;
    }
    setTaskList(newTasks);
  };

  const addNewTask = () => {
    const newTasks = [...taskList];

    const newTask = {
      id: -1,
      task: "",
      status: "To Do",
      isEdit: true,
      tempStatus: "To Do",
      updatedAt: moment().toISOString(),
    };
    newTasks.push(newTask);
    setTaskList(newTasks);
    setTimeout(() => {
      const element = document.getElementById("container");
      if (element) {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const onDeleteTask = (taskId: number) => {
    const newTasks = [...taskList];
    const taskIndex = newTasks.findIndex((item) => item.id === taskId);
    if (taskIndex > -1) {
      newTasks.splice(taskIndex, 1);
      setTaskList(newTasks);
      if (taskId !== -1) {
        deleteTask(taskId);
      }
    }
  };

  const getStatusWiseColor = (status: string) => {
    let bgColor = "#1E90FF";
    if (status === "In Progress") {
      bgColor = "#FFA500";
    } else if (status === "Completed") {
      bgColor = "#32CD32";
    }
    return { color: "#FFF", bgColor };
  };

  const handleDragStart = (
    e: React.DragEvent,
    taskId: number,
    status: string
  ) => {
    e.dataTransfer.setData("taskId", taskId.toString());
    e.dataTransfer.setData("status", status);
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const dropStatus = e.dataTransfer.getData("status");

    if (status !== dropStatus) {
      const newTasks = [...taskList];
      const taskIndex = newTasks.findIndex(
        (item) => item.id === Number(taskId)
      );
      if (taskIndex > -1) {
        newTasks[taskIndex].status = status;
        newTasks[taskIndex].tempStatus = status;
        updateTask(newTasks[taskIndex]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Box
      id="container"
      padding={"16px 0px"}
      height={"calc(100vh - 110px)"}
      sx={{ overflowY: "auto" }}
    >
      <Container sx={{ display: "flex", gap: "8px", flexDirection: "column" }}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            color="warning"
            onClick={addNewTask}
            disabled={taskList.length > tasks.length}
          >
            <AddIcon fontSize="small" /> Add Task
          </Button>
        </Box>
        <Grid2 container spacing={2}>
          {["To Do", "In Progress", "Completed"].map((status) => (
            <Grid2
              size={{ xs: 12, sm: 4, md: 4 }}
              key={status}
              onDrop={(e) => handleDrop(e, status)}
              onDragOver={handleDragOver}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                color={getStatusWiseColor(status).color}
                fontWeight={500}
                marginBottom={"8px"}
                padding={"12px 8px"}
                borderRadius={"8px"}
                fontSize={"14px"}
                bgcolor={getStatusWiseColor(status).bgColor}
              >
                {status} (
                {taskList.filter((fItem) => fItem.status === status).length})
              </Box>
              {taskList
                .filter((fItem) => fItem.status === status)
                .map((item) => (
                  <Card
                    key={item.id}
                    sx={{
                      marginBottom: "16px",
                      cursor: "move",
                    }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id, status)}
                  >
                    <Box
                      key={item.id}
                      display={"flex"}
                      bgcolor={"#F7F9FC"}
                      color={"##043C61"}
                      padding={"16px"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      gap={"8px"}
                      fontSize={"14px"}
                    >
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={"8px"}
                      >
                        {item.id !== -1 && (
                          <Box fontWeight={500} color={"#ed6c02"}>
                            User ID:{" "}
                            <span style={{ color: "#ed6c02" }}>{item.id}</span>
                          </Box>
                        )}
                        <Box maxWidth={230} color={"#018481"} fontWeight={500}>
                          Task:{" "}
                          {item.isEdit ? (
                            <Box>
                              <TextField
                                value={item.task}
                                fullWidth
                                error={!item.task}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  handleChangeTask(item.id, event);
                                }}
                                sx={{
                                  backgroundColor: "#FFF",
                                  "& .MuiInputBase-root": {
                                    height: "40px",
                                  },
                                  "& .MuiInputBase-input": {
                                    padding: "10px 12px",
                                    fontSize: "14px",
                                  },
                                }}
                              />
                            </Box>
                          ) : (
                            <span style={{ color: "#018481" }}>
                              {item.task}
                            </span>
                          )}
                        </Box>
                        <Box maxWidth={230} color={"#018481"} fontWeight={500}>
                          Status:{" "}
                          {item.isEdit ? (
                            <Box>
                              <Select
                                fullWidth
                                sx={{
                                  backgroundColor: "#FFF",
                                  height: "40px",
                                  fontSize: "14px",
                                }}
                                value={item.tempStatus}
                                label=""
                                onChange={(event: SelectChangeEvent) =>
                                  handleChangeTaskStatus(item.id, event)
                                }
                              >
                                <MenuItem value={"To Do"}>To Do</MenuItem>
                                <MenuItem value={"In Progress"}>
                                  In Progress
                                </MenuItem>
                                <MenuItem value={"Completed"}>
                                  Completed
                                </MenuItem>
                              </Select>
                            </Box>
                          ) : (
                            <span style={{ color: "#018481" }}>
                              {item.status}
                            </span>
                          )}
                        </Box>
                        <Box
                          color={"#464c4f"}
                          fontSize={"10px"}
                          fontStyle={"italic"}
                        >
                          Last updated {moment(item.updatedAt).fromNow()}
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        flexDirection={"column"}
                      >
                        <IconButton
                          color="success"
                          onClick={() => onEditOrSave(item.id, !item.isEdit)}
                        >
                          {item.isEdit ? (
                            <SaveIcon fontSize="small" />
                          ) : (
                            <EditNoteIcon fontSize="small" />
                          )}
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => onDeleteTask(item.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                ))}
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
