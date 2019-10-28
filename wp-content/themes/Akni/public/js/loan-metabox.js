const loan = {
  sample : '#sample_count',
  loanTable : '#loan_table',

  init: function() {
    this.loanTableAction();
    this.sampleChangeAction();
  },

  sampleChangeAction: function()
  {
    jQuery(this.sample).change(function(){
      loan.loanTableAction();
    })
  },
  loanTableAction: function()
  {
    const call = jQuery(this.sample).val();
    const row  = jQuery(this.sample).data('rows');
    const loan_id  = jQuery(this.sample).data('id');
    loan.createLoanTable(call, row, loan_id);
  },
  createLoanTable: function(call,row,loan_id)
  {
    if(call){
      jQuery.ajax({
        type: 'POST',
        url: ajaxurl,
        data: {
          'action':'createLoanTable',
          'call':call,
          'row':row,
          'loan_id':loan_id
        },
        dataType: 'html',
        success: function(responce){
          jQuery(loan.loanTable).html(responce);
        },
        error: function() {
          alert('Sory... error');
        }
      })
    }
  }

};

document.addEventListener('DOMContentLoaded', function(){
  loan.init();
});
