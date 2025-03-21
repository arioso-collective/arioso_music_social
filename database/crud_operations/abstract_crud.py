from abstract_crud import AbstractCRUD, abstractmethod
from bson.objectid import ObjectId
from pymongo.collection import Collection

class AbstractCRUD(AbstractCRUD):
    def __init__(self, collection: Collection):
        self.collection = collection
    
    @abstractmethod
    def create(self, data: dict):
        pass

    @abstractmethod
    def read(self, identifier: str):
        pass
    
