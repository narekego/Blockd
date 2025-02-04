/* eslint-disable import/no-anonymous-default-export */
export default {
    control: {
      fontSize: 16,
      // fontWeight: 'normal',
    },
  
    '&multiLine': {
      control: {
        fontFamily: 'monospace',
        minHeight: 20,
        maxWidth:300
      },
      input: {
        padding: 9,
      },
    },
  
    '&singleLine': {
      display: 'inline-block',
      width: 180,
  
      highlighter: {
        padding: 1,
        border: '2px inset transparent',
      },
      input: {
        padding: 1,
        border: '2px inset',
      },
    },
  
    suggestions: {
      list: {
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.15)',
        fontSize: 16,
      },
      item: {
        padding: '5px 15px',
        borderBottom: '1px solid rgba(0,0,0,0.15)',
        '&focused': {
          backgroundColor: '#cee4e5',
        },
      },
    },
  }