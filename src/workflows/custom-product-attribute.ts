import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { productsCreatedHookHandler } from "@nicogorga/medusa-product-attributes/utils/products-created-handler"

createProductsWorkflow.hooks.productsCreated(
    async ({ products, additional_data }, { container }) => {
      const links = await productsCreatedHookHandler({ products, additional_data, container })

      // Your own logic (if any). You can return 'links' to your compensation function, to dismiss the links if an error occurs
    }
)
