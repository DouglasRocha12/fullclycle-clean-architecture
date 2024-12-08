import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "Product 1",
    price: 10,
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create prodcut use case", () => {

    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreatedUseCase = new CreateProductUseCase(productRepository)

        const output = await productCreatedUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });


        
    })

    it("should thrown an error when name is missing", async () => {

        const productRepository = MockRepository();
        const productCreatedUseCase = new CreateProductUseCase(productRepository)

        input.name = "";
        
        await expect(productCreatedUseCase.execute(input)).rejects.toThrow("Name is required");
        
    })

    it("should thrown an error when price is missing", async () => {

        const productRepository = MockRepository();
        const productCreatedUseCase = new CreateProductUseCase(productRepository)

        input.price = 0;
       
        await expect(productCreatedUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
        
    })


})