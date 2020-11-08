#!/usr/bin/env node
import { generateSchemas } from '../lib'

// TODO: implement cli interface with args for supported schemas
generateSchemas({fetchAllSchemas: false})