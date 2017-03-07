############################################
Dynamic client-side validation using Javascript
############################################

Simple validation
=================

Demo1 with 'required' validation
--------------------------------

$("#form_sample_1").mbvalidator({
   required: ['name', 'email']
}, {
   errorBinding: 'p',
   errorClass: 'myclass',
});

Just pass formId, rules for validations and options required.
-------------------------------------------------------------

 .. code:: javascript
 $("#form_sample_1").mbvalidator({
        required: ['name'],
        email: ['email'],
        number: ['name'],
        decimal: ['name'],
    }, {
        errorBinding: 'div',
        errorClass: 'error',
 });



Validation Options
==================

+-----------------------+---------------------------------+
| Rule                  | Description                     |
+=======================+=================================+
| required              | For required validation         |
+-----------------------+---------------------------------+
| email                 | For email address validation    |
+-----------------------+---------------------------------+
| number                | For number value validation     |
+-----------------------+---------------------------------+
| decimal               | For decimal number validation   |
+-----------------------+---------------------------------+