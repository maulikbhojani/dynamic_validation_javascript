# dynamic_validation_javascript
Dynamic client-side validation using Javascript

:: Simple validation ::

 - Demo1 with 'required' validation

   $("#form_sample_1").mbvalidator({
           required: ['name', 'email']
       }, {
           errorBinding: 'p',
           errorClass: 'myclass',
   });

   Just pass formId, rules for validations and options required.