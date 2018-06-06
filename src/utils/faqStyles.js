const defaultFAQStyle =  {
  '& img': {
    maxWidth: '100%',
  },
  backgroundColor: 'green',
  padding: '0 3px',
  borderRadius: '10px',
  maxWidth: '100%',
  minWidth: '25%',
  textAlign: 'left',
  margin: '0',
  position: 'relative',
  '& p, & h1, & h2, & h3, & h4, & h5, & h6': {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  }
};

function createFAQStyle(style){
  return Object.assign({}, defaultFAQStyle, style);
};

export default createFAQStyle;
