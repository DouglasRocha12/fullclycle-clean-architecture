import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(new Product("1", "Product 1", 10))),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};


describe("Test find product unit test use case", () => {
   
    it("should find a unit test product", async () => {


        const productRepository = MockRepository();
     
        const output = {
            id: "1",
            name: "Product 1",
            price: 10,
        };

        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(output.id);
        expect(result.name).toBe(output.name);
        expect(result.price).toBe(output.price);

    })

    it("should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "1",
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");


    })

});

