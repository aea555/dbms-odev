function Links(props) {
  return (
    <a
      className="Link col-sm-6 align-items-center justify-content-center text-center"
      href={props.url}
    >
      <i className={props.class}></i>
      <a className="linkanchor" href={props.url}>
        {props.name}
      </a>
    </a>
  );
}

export default Links;
