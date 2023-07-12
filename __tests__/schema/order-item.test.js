const schema = require("../../dest/validators/order-items");

describe("schema", () => {
  it("validates a valid input", () => {
    const input = {
      id: 1,
      product: "Product A",
      quantity: 2,
      price: 10,
      saleOrderId: 1,
    };
  
    const { error } = schema.default.validate(input);
    expect(error).toBeUndefined();
  });

  it("returns an error for an invalid input", () => {
    const input = {
      id: 1,
      product: "Product A",
      quantity: -1, // invalid quantity
      price: 10,
      saleOrderId: 1,
    };
    const { error } = schema.default.validate(input);
    expect(error).toBeDefined();
  });
});
