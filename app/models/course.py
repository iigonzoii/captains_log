from .db import db, environment, SCHEMA, add_prefix_for_prod

class Course(db.Model):
    __tablename__ = 'courses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    highlight_img = db.Column(db.String(250))
    poi = db.Column(db.String(250))
    img_1=db.Column(db.String(250))
    img_2=db.Column(db.String(250))
    img_3=db.Column(db.String(250))
    img_4=db.Column(db.String(250))
    name = db.Column(db.String(50), nullable=False)
    surface = db.Column(db.String(50))
    gas = db.Column(db.Integer)
    resource_access = db.Column(db.Integer)
    difficulty = db.Column(db.Integer)
    curved_roads = db.Column(db.Integer)
    origin_city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    log_entry = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    reviews = db.relationship('Review', back_populates='course', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'highlight_img': self.highlight_img,
            'poi': self.poi,
            'img_1': self.img_1,
            'img_2': self.img_2,
            'img_3': self.img_3,
            'img_4': self.img_4,
            'name': self.name,
            'surface': self.surface,
            'gas': self.gas,
            'resource_access': self.resource_access,
            'difficulty': self.difficulty,
            'curved_roads': self.curved_roads,
            'origin_city': self.origin_city,
            'state': self.state,
            'log_entry': self.log_entry,
            'country': self.country,
            'reviews': [review.to_dict() for review in self.reviews],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
