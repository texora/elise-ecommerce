import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Product } from '../types/fakeApiTypes'

export const useFetchItemsQuery = () => {
  const fetchAllItems = async (): Promise<Product[]> => {
    const url = `https://fakestoreapi.com/products`
    const response = await axios.get(url)

    return response.data
  }

  return useQuery(['fetchItems'], fetchAllItems, { refetchOnWindowFocus: false })
}