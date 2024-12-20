import ListProductUseCase from "./list.product.usecase"

const product1 = {
    id: '1',
    name: 'Product 1',
    price: 100
}
const product2 ={
    id: '2',
    name: 'Product 2',
    price: 200
}

const MockRepository = ()=> {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn()
    }

}


describe("Unit Test for list product usecase", () => {

    it("should list a product", async () => {
        const productRepository = MockRepository();

        const listProductUseCase = new ListProductUseCase(productRepository);

        const output = await listProductUseCase.execute({});

        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    })
})

