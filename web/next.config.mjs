/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Add rule for .node files
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
  
      // Exclude onnxruntime-node from being processed
      config.externals.push({
        'onnxruntime-node': 'commonjs onnxruntime-node',
      });
  
      // Ignore specific .node files
      config.resolve.alias['onnxruntime-node'] = false;
  
      // Add fallback for 'fs' module
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
  
      return config;
    },
  };
  
  export default nextConfig;