import React, {useState} from "react";
import {Product, Products} from "./types";

export interface MarketProps {
    products: Products;
}

export interface ProductTableProps {
    products: Products;
    filterText: string;
    inStockOnly: boolean;
}

export interface SearchBarProps {
    filterText: string;
    inStockOnly: boolean;
    onFilterTextChange: (text: string) => void;
    onInStockOnlyChange: (inStock: boolean) => void;
}



function ProductCategoryRow({ category }: { category: string }) {
    return (
        <tr>
            <th colSpan={2}>
                {category}
            </th>
        </tr>
    );
}

function ProductRow({ product }: { product: Product }) {
    const name = product.stocked ? product.name :
        <span style={{ color: 'red' }}>
      {product.name}
    </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

function ProductTable({ products, inStockOnly, filterText }: ProductTableProps) {
    const rows: React.ReactElement[] = [];
    let lastCategory: string | null = null;

    products.forEach((product) => {
        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }
        if (inStockOnly && !product.stocked) {
            return;
        }
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category} />
            );
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name} />
        );
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}: SearchBarProps) {
    return (
        <form>
            <input
                type="text"
                value={filterText}
                placeholder="Search..."
                onChange={(event) => onFilterTextChange(event.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(event) => onInStockOnlyChange(event.target.checked)}
                />
                {' '}
                Only show products in stock
            </label>
        </form>
    );
}


export default function Market({products}: MarketProps) : React.ReactElement {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}

            />
            <ProductTable
                products={products}
                filterText={filterText}
                inStockOnly={inStockOnly} />
        </div>
    );
}
