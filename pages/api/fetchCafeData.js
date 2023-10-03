import axios from 'axios'
export default async function fetchData(req, res) {
  try {
    const result = await axios.get('http://cafenomad.tw/api/v1.2/cafes')
    const data = result.data
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred' })
  }
}
