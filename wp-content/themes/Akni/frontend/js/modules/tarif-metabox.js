const tariff = {
  time_periods_count : '#time_periods_count',
  tariffTable : '#tariff_table',

  init: function() {
    this.tariffTableAction();
    this.sampleChangeAction();
  },

  sampleChangeAction: function()
  {
    jQuery(this.time_periods_count).change(function(){
      tariff.tariffTableAction();
    })
  },

  tariffTableAction: function()
  {
    const call = jQuery(this.time_periods_count).val();
    const tariff_id  = jQuery(this.time_periods_count).data('id');
    tariff.createTariffTable(call, tariff_id);
  },

  createTariffTable: function(call, tariff_id)
  {
    if(call) {
      jQuery.ajax({
        type: 'POST',
        url: ajaxurl,
        data: {
          'action':'createTariffTable',
          'call':call,
          'tariff_id':tariff_id
        },
        dataType: 'html',
        success: function(responce) {
          jQuery(tariff.tariffTable).html(responce);
        },
        error: function() {
          alert('Sorry... error');
        }
      })
    }
  }
};

document.addEventListener('DOMContentLoaded', function(){
  tariff.init();
});
