exports.getDynamicForm = (req, res, next) => {
  setTimeout(() => {
    res.status(200).json({
      controls: [
        { name: 'title', type: 'text', validators: ['required'] },
        { name: 'email', type: 'email', validators: ['email'] },
        { name: 'phone', type: 'text', requiredIf: '!email' },
        { name: 'message', type: 'textarea', validators: ['required'] }
      ]
    });
  }, 500);
};
