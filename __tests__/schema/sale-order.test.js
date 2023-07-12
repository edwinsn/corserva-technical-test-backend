const schema = require("../../dest/validators/sale-orders");

describe("schema", () => {
  it("validates a valid input", () => {
    const input = {
      customer: "John Doe",
      deliveryAddress: "123 Main St",
      paymentMethod: "Cash",
    };

    const { error } = schema.default.validate(input);
    expect(error).toBeUndefined();
  });

  it("returns an error for an invalid input", () => {
    const input = {
      customer: "John Doe",
      deliveryAddress: "123 Main St",
      paymentMethod: "Invalid Method",
    };
    const { error } = schema.default.validate(input);
    expect(error).toBeDefined();
  });
});
