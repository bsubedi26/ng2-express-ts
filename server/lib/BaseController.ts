import { Request, Response, NextFunction } from "express";

interface IController {
  find(req: Request, res: Response, next: NextFunction): Promise<any>
  findOne(req: Request, res: Response, next: NextFunction): Promise<any>
  findById(req: Request, res: Response, next: NextFunction): Promise<any>
  create(req: Request, res: Response, next: NextFunction): Promise<any>
  update(req: Request, res: Response, next: NextFunction): Promise<any>
  remove(req: Request, res: Response, next: NextFunction): Promise<any>
}

export default class BaseController implements IController {
  model: any;

  constructor(model) {
      this.model = model
  }

  find(req, res, next): Promise<any> {
    return this.model.find(req.query)
    .then(collection => res.status(200).json(collection))
    .catch(err => next(err));
  }

  findOne(req, res, next): Promise<any> {
    return this.model.findOne(req.body)
      .then(doc => {
        if (!doc) { return res.status(404).json({ error: 'Invalid Credentials. The username and password does not match.'}); }
        return res.status(200).json(doc);
      })
      .catch(err => next(err));
  }

  findById(req, res, next): Promise<any> {
    return this.model.findById(req.params.id)
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      return res.status(200).json(doc);
    })
    .catch(err => next(err));
  }

  create(req, res, next): Promise<any> {
    return this.model.create(req.body)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err));
  }

  update(req, res, next): Promise<any> {
    const conditions = { _id: req.params.id };

    return this.model.update(conditions, req.body)
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      return res.status(200).json(doc);
    })
    .catch(err => next(err));
  }

  remove(req, res, next): Promise<any> {
    return this.model.remove(req.params.id)
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      return res.status(204).end();
    })
    .catch(err => next(err));
  }

}