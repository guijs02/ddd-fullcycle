import ChangeAddressEvent from "../../customer/event/change-address";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendMessageWhenAddressIsUpdatedHandler from "../../customer/event/handler/send-message-when-address-is-updated.handle";
import SendMessageWhenCustomerIsCreatedHandler from "../../customer/event/handler/send-message-when-customer-is-created.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  // #region Product Event Tests
  it("should register an event handler for ProductCreatedEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler for ProductCreatedEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
  // #endregion

  // #region Customer Event Tests
  it("should register an event handler for CustomerCreatedEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler for CustomerCreatedEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      description: "Customer 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  // #endregion

  // #region Customer Created Event with Address Updated

  it("should register an event handler for CustomerCreatedEvent with Address Updated", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenAddressIsUpdatedHandler();

    eventDispatcher.register("AddressUpdatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["AddressUpdatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler for CustomerCreatedEvent with Address Updated", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenAddressIsUpdatedHandler();

    eventDispatcher.register("AddressUpdatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("AddressUpdatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["AddressUpdatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenAddressIsUpdatedHandler();

    eventDispatcher.register("AddressUpdatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"]
    ).toBeUndefined();
  });


  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenAddressIsUpdatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("AddressUpdatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"][0]
    ).toMatchObject(eventHandler);

    const addressUpdatedEvent = new ChangeAddressEvent({
      Address: {
        id: "1",
        street: "Street 1",
        number: 1,
        city: "City 1",
        zip: "Zip 1",
        name: "Customer 1",
      }
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(addressUpdatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });


});
