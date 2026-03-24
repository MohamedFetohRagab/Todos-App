interface IProps {
  completed: boolean;
}

const Completed = ({ completed }: IProps) => {
  return (
    <span
      style={{
        backgroundColor: completed ? "#00800059" : "#ff000059",
        padding: "5px",
        borderRadius: "8px",
      }}
    >
      {completed ? "Completed" : "Not Completed"}
    </span>
  );
};

export default Completed;
