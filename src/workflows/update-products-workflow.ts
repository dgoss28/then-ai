import { updateProductsWorkflow } from "@medusajs/medusa/core-flows";
import { productsUpdatedHookHandler } from "@nicogorga/medusa-product-attributes/utils/products-updated-handler"

updateProductsWorkflow.hooks.productsUpdated(
    async ({ products, additional_data }, { container }) => {
      const links = await productsUpdatedHookHandler({ products, additional_data, container })

      // Your own logic (if any). You can return 'links' to your compensation function, to dismiss the links if an error occurs
    }
)
