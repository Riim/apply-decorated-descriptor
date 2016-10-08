function applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function(key) {
		desc[key] = descriptor[key];
	});
	desc.configurable = !!desc.configurable;
	desc.enumerable = !!desc.enumerable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.reduceRight(function(desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = void 0;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

module.exports = applyDecoratedDescriptor;
