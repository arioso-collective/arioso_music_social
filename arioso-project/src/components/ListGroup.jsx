function ListGroup() {
  let items = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
  items = [];

  const message = items.length === 0 ? <p>No item found</p> : null;

  return (
    <>
      <h1>List Group</h1>
      {message}
      <ul className="list-group">
        {items.map((item) => (
          <li key={item} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
