import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Address from "../../value-object/address";
import ChangeAddressEvent from "../change-address";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendMessageWhenAddressIsUpdatedHandler
  implements EventHandlerInterface<ChangeAddressEvent>
{
  handle(event: ChangeAddressEvent): void {

    var address = event.eventData.Address
    
    const addressUpdated = `${address.street}, ${address.number}, ${address.city}, ${address._zip}`;

     console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${addressUpdated}`); 
  }
}
