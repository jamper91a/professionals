/**
 * professional
 * -----------------------------------------------------------------------------
 * A new component
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('professional-mini', {

    //  ╔═╗╦═╗╔═╗╔═╗╔═╗
    //  ╠═╝╠╦╝║ ║╠═╝╚═╗
    //  ╩  ╩╚═╚═╝╩  ╚═╝
    props: [
      'professional'
    ],

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: function (){
      return {
        callCssClass: '',
        chatCssClass: '',
        disableCall: false,
        disableChat: false,
        chat: null,
        myProfessional: this.professional
      };
    },

    //  ╦ ╦╔╦╗╔╦╗╦
    //  ╠═╣ ║ ║║║║
    //  ╩ ╩ ╩ ╩ ╩╩═╝
    template: `
<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-1">
    <div>
      <div class="card" :data-professional="myProfessional.id">
          <div class="card-body">
              <div class="mx-auto d-block">
                  <img class="rounded-circle mx-auto d-block" src="/images/icon/avatar-01.jpg" alt="Card image cap">
                  <h5 class="text-sm-center mt-2 mb-1">{{myProfessional.user.name}}</h5>
                  <div class="location text-sm-center">
                      <i class="fa fa-map-marker"></i>{{translate(myProfessional.user.country.name)}}
                      </div>
              </div>
              <hr>
              <div class="card-text text-sm-center">
                    {{translate(myProfessional.profession.name)}}<br>
                  {{myProfessional.rate.currency.symbol}} {{myProfessional.rate.call}} -
                  {{myProfessional.rate.currency.symbol}} {{myProfessional.rate.chat}}
              </div>

          </div>
          <div class="card-footer text-center">
              <div class="row">
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">

                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">

                  </div>
              </div>
              <div class="row">
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <!--                    Button visible from medium devices-->
                      <button @click="callProfessional(myProfessional.id)"
                              :data-type-button="'call-1-'+myProfessional.id"
                              :data-professional="myProfessional.id"
                              type="button"
                              class="btn btn-lg d-none d-md-inline text"
                              v-bind:class="[callCssClass]"
                              @disable="disableCall">
                          <i class="fa fa-phone"></i>
                          {{translate('Call')}}
                      </button>
                      <!--                    Button visible in super small and small devices-->
                      <button
                              @click="callProfessional(myProfessional.id)"
                              :data-type-button="'call-2-'+myProfessional.id"
                              :data-professional="myProfessional.id"
                              type="button"
                              class="btn btn-block d-block d-sm-block d-md-none"
                              v-bind:class="callCssClass"
                              @disable="disableCall">>
                          <i class="fa fa-phone"></i>
                          {{translate('Call')}}
                      </button><br>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
  <!--                    Button visible from medium devices-->
                      <button
                              @click="chatProfessional(myProfessional.id)"
                              :data-type-button="'chat-1-'+myProfessional.id"
                              :data-professional="myProfessional.id"
                              type="button"
                              class="btn btn-lg d-none d-md-inline"
                              v-bind:class="chatCssClass"
                              @disable="disableCall">
                          <i class="fa fa-comments"></i>
                          {{translate('Chat')}}
                      </button>
  <!--                    Button visible in super small and small devices-->
                      <button
                              @click="chatProfessional(myProfessional.id)"
                              :data-type-button="'chat-1-'+myProfessional.id"
                              :data-professional="myProfessional.id"
                              type="button"
                              class="btn btn-block d-block d-sm-block d-md-none"
                              v-bind:class="chatCssClass"
                              @disable="disableCall">
                          <i class="fa fa-comments"></i>
                          {{translate('Chat')}}
                      </button><br>
                  </div>
              </div>


          </div>
      </div>
  </div>
    <!-- modal confirm chat -->
    <div class="modal fade" id="confirmChat" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="smallmodalLabel">{{translate('Confirm Chat')}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>
                      {{translate('Are you sure you want to start the chat?')}}
                    </p>
                </div>
                <div class="modal-footer">
                    <button @click="cancelChat(chat.id)" type="button" class="btn btn-secondary" data-dismiss="modal">{{translate('Cancel')}}</button>
                    <button @click="openChatWindow()" type="button" class="btn btn-primary">{{translate('Confirm')}}</button>
                </div>
            </div>
        </div>
    </div>
    <!-- end modal Ban -->
</div>
    `,

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {

    },

    mounted: function (){
      const self = this;
      this._analyzeCss();
      ProfessionalsEvents.$on('professional-mini', function (event, data) {
        switch (event) {
          case 'chatAccepted':
            self.chat = data.chat;
            self.openChatWindow();
            break;
          case 'chatDeclined':
            self._chatDeclined(data);
            break;
          case 'changeStatus':
            console.log(self.myProfessional);
            if(data.professional.id === self.myProfessional.id){
              console.log('changeStatus');
              self.myProfessional = data.professional;
              self._analyzeCss();
            }

            break;

        }
      });
    },

    beforeDestroy: function() {

    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
      _analyzeCss: function () {
        switch (this.myProfessional.state.id) {
          case PROFESSIONAL_STATES.ONLINE:
            this.callCssClass = 'btn-success';
            this.chatCssClass = 'btn-success';
            break;
          case PROFESSIONAL_STATES.BUSY:
            this.callCssClass = 'btn-warning';
            this.chatCssClass = 'btn-warning';
            this.disableCall = true;
            this.disableChat = true;
            break;
          case PROFESSIONAL_STATES.JUST_CALLS:
            this.callCssClass = 'btn-success';
            this.chatCssClass = 'btn-danger';
            this.disableChat = true;
            break;
          case PROFESSIONAL_STATES.JUST_CHAT:
            this.callCssClass = 'btn-danger';
            this.chatCssClass = 'btn-success';
            this.disableCall = true;
            break;
          case PROFESSIONAL_STATES.OFFLINE:
            this.callCssClass = 'btn-secondary';
            this.chatCssClass = 'btn-secondary';
            this.disableCall = true;
            this.disableChat = true;
            break;
        }
      },
      translate: function (key) {
        return I.get(key);
      },
      callProfessional: function (professionalId){
        alert("CALL PROFESSIONAL: " + professionalId)
      },
      chatProfessional: function(professionalId) {
        const self = this;
        WebServices.createChat(professionalId, function (chat) {
          self.chat = chat;
          $('#confirmChat').modal({
            backdrop: 'static',
            keyboard: false
          });
        }, async function (error) {
          OverHang.error(I.get(error.exit));
        })
      },
      openChatWindow: function () {
        $('#confirmChat').modal('hide');
        window.open('/chat/'+this.chat.id, '_blank');

      },
      cancelChat: function () {
        $('#confirmChat').modal('hide');
        WebServices.declineChatByCustomer(this.chat.id, function (chat) {
        }, async function (error) {
          OverHang.error(I.get(error.exit));
        });


      },
      _chatDeclined: function (data) {
        console.log('_chatDeclined', data);
        $('#confirmChat').modal('hide');
        WebServices.declineChat(data.chat.id, function (chat) {
        }, async function (error) {
          OverHang.error(I.get(error.exit));
        });
      },
      _changeProfessionalStatus: function (statusId) {

      }
    },

  });
