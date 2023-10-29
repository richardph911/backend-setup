import { MongoClient, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/schemas/User.schema'

config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nodejs.zj5ajsb.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  private db: Db
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connectDB() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_COLLLECTION_NAME as string)
  }
}
const databaseService = new DatabaseService()
export default databaseService
